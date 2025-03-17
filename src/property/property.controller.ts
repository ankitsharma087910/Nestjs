import {
  Body,
  Controller,
  Get,
  Header,
  Headers,
  HttpCode,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { IdParamDto } from './dto/idParam.dto';
import { ParseIdPipe } from './pipes/parseIdpipe';
import { ZodValidationPipe } from './pipes/zodValidationPipe';
import {
  createPropertySchema,
  CreatePropertyZodDto,
} from './dto/createPropertyZod.dto';
import { HeadersDto } from './dto/headers.dto';
import { RequestHeader } from './pipes/request-header';
import { PropertyService } from './property.service';

@Controller('property')
export class PropertyController {
  // don't create your dependency use dependency injection
  // propertyService:PropertyService;
  // constructor(){
  //     this.propertyService = new PropertyService();
  // }


  constructor(private propertyService:PropertyService) {}

  @Get()
  findAll() {
    return this.propertyService.findAll();
  }

  //   @Get(':id')
  //   findOne(@Param('id', ParseIntPipe) id, @Query('sort', ParseBoolPipe) sort) {
  //     // console.log(typeof(Number(id)))
  //     console.log(typeof id);
  //     console.log(typeof sort);
  //     return id;
  //   }

  @Get(':id')
  findOne(@Param() param: IdParamDto) {
    return this.propertyService.findOne();
  }

  // @Get(":id/:slug")
  // findOne(@Param('id') id ,@Param('slug') slug ){
  //     return `id :${id} slug ${slug}`;
  // }

  // whitlist will remove the extra fields that are not defined in createpropertydto
  // forbidNonWhitelisted using this we are sending error back to the client about the extra fields
  // @Post()
  // @UsePipes(new ValidationPipe({whitelist:true,forbidNonWhitelisted:true}))
  // create(@Body() body : CreatePropertyDto){
  //     return body;
  // }

  //   @Post()
  //   // @UsePipes(new ValidationPipe({whitelist:true,forbidNonWhitelisted:true}))
  //   create(
  //     @Body(
  //       new ValidationPipe({
  //         whitelist: true,
  //         forbidNonWhitelisted: true,
  //         groups: ['create'],
  //         always:true
  //       }),
  //     )
  //     body: CreatePropertyDto,
  //   ) {
  //     return body;
  //   }

  @Post()
  @UsePipes(new ZodValidationPipe(createPropertySchema))
  create(@Body() body: CreatePropertyZodDto) {
    return this.propertyService.create();
  }

  // @Post()
  // @HttpCode(202)
  // create(@Body("name") name){
  //     return name;
  // }

  //   @Patch(':id')
  //   update(@Param() {id}: IdParamDto, @Body() body: CreatePropertyDto) {
  //     return body;
  //   }

  //   @Patch(':id')
  //   update(
  //     @Param('id', ParseIdPipe) id,
  //     @Body() body: CreatePropertyDto,
  //   ) {
  //     return body;
  //   }

  @Patch(':id')
  update(
    @Param('id', ParseIdPipe)
    @Body()
    body: CreatePropertyDto,
    @RequestHeader(
      new ValidationPipe({ whitelist: true, validateCustomDecorators: true }),
    )
    header: HeadersDto,
  ) {
    return this.propertyService.update();
  }
}
