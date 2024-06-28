import {
  ActivatedRouteSnapshot,
  MaybeAsync,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { LessonDetail } from "../model/lesson-detail";
import { Observable } from "rxjs";
import { CoursesService } from "./courses.service";
import { Injectable } from "@angular/core";
@Injectable()
export class LessonDetailsResolver implements Resolve<LessonDetail> {
  constructor(private courseService: CoursesService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<LessonDetail> {
    const courseUrl = route.paramMap.get("courseUrl");
    const lessonSeq = route.paramMap.get("lessonSeq");

    return this.courseService.loadLessonDetail(courseUrl, lessonSeq);
  }
}
