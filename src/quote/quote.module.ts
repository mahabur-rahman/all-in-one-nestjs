import { forwardRef, Module } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { QuoteResolver } from './quote.resolver';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { QuoteSchema } from './schema/quote.schema';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([{ name: 'Quote', schema: QuoteSchema }]),
  ],
  providers: [QuoteResolver, QuoteService],
})
export class QuoteModule {}
