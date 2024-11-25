import { NgModule } from '@angular/core';
import { WordLimitPipe } from './word-limit.pipe';

@NgModule({
  declarations:[WordLimitPipe],
  exports: [WordLimitPipe]
})
export class WordLimitModule {}