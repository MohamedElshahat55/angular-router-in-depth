import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CourseComponent } from "./course/course.component";
import { CourseResolver } from "./services/course.resolver";
import { LessonsListComponent } from "./lessons-list/lessons-list.component";
import { LessonDetailComponent } from "./lesson/lesson-detail.component";
import { LessonsResolver } from "./services/lessons.resolver";
import { LessonDetailsResolver } from "./services/lesson-details.resolver";
import { AuthGuard } from "../services/auth.guard";
import { ConfirmExitGuard } from "../services/confirm-exit.guard";

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: ":courseUrl",
    component: CourseComponent,
    resolve: {
      course: CourseResolver,
    },
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    canDeactivate: [ConfirmExitGuard],
    children: [
      {
        path: "",
        component: LessonsListComponent,
        resolve: { lessons: LessonsResolver },
      },
      {
        path: "lessons/:lessonSeq",
        component: LessonDetailComponent,
        resolve: {
          lesson: LessonDetailsResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CourseResolver,
    LessonsResolver,
    LessonDetailsResolver,
    AuthGuard,
    ConfirmExitGuard,
  ],
})
export class CoursesRoutingModule {}
