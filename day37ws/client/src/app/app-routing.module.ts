import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './components/post.component';
import { UploadComponent } from './components/upload.component';

const routes: Routes = [
  {path: '', component: PostComponent},
  {path: 'upload', component: UploadComponent},
  {path: '**', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }