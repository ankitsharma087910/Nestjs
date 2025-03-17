import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";


// injectable will allow us to use this class outside this module
@Injectable() 
export class ParseIdPipe implements PipeTransform<string,number>{
    transform(value: string): number {
        const val = parseInt(value,10);
        if(isNaN(val))
            throw new BadRequestException("Id must be a number")
        if(val <=0)
            throw new BadRequestException("id must be positive")
        return val;
    }
}