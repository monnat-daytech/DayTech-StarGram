import { Body, Controller,Post,  UseInterceptors,
    UploadedFile, Param ,Get , Put , Delete, Patch} from '@nestjs/common';
import { CreateMyPostDto } from './dto/create-mypost-dto';
import { MypostService } from './mypost.service';
import { diskStorage } from 'multer';
import * as fsExtra from 'fs-extra';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('mypost')
export class MypostController {
    constructor(private myPostService: MypostService){}

  @Get('/:id')
  getMyPostById(@Param('id') id: number) {
    // return `Get id is ${id}`;
    return this.myPostService.getMyPostById(id);
  }

  @Delete('/:id')
  deleteMyPostById(@Param('id') id: number) {
    return this.myPostService.deleteMyPost(id);
  }

    @Post()
    @UseInterceptors(
        FileInterceptor('file', {
          storage: diskStorage({
            destination: './upload',
            filename: (req, file, cb) => {
              const randomName = Array(32)
                .fill(null)
                .map(() => Math.round(Math.random() * 16).toString(16))
                .join('');
              return cb(null, `${randomName}${extname(file.originalname)}`);
            },
          }),
        }),
      )
    async addMyPost(@UploadedFile() file, @Body() createMyPostDto: CreateMyPostDto){
        const myPost = await this.myPostService.createMyPost(createMyPostDto)
 
        const fileExtension = extname(file.filename);
        const fileImage = myPost.id + fileExtension;
        fsExtra.move(file.path, `upload/${fileImage}`);
        myPost.image = fileImage;
        
        await myPost.save();

        return myPost;
    }

    @Patch('/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async upDateMyPostById(
    @UploadedFile() file,
    @Param('id') id: number,
    @Body() createMyPostDto: CreateMyPostDto,
  ) {
    // const { name, price, stock } = createStockDto;
    // console.log(`${name}, ${price}, ${stock}`);
    // return `${name}, ${price}, ${stock} Update id is ${id}`;

    // update single
    // return this.stockService.updateProduct(id, createStockDto);
    const product = await this.myPostService.upDateMyPost(id, createMyPostDto);
    // !เช็คว่ามีไฟล์ไหม แล้วก็ ลบไฟล์ตัวเก่าเพื่อเพิ่มไฟล์ตัวใหม่สำหรับกัน นามสกุลที่ไม่เหมือนกัน
    if (file) {
      fsExtra.remove(`upload/${product.image}`);
      const fileImage = id + extname(file.filename);
      fsExtra.move(file.path, `upload/${fileImage}`);
      product.image = fileImage;
      await product.save();
    }

    return product;
  }
}





