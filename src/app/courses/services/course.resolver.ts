import {
  ActivatedRouteSnapshot,
  MaybeAsync,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Course } from "../model/course";
import { Observable } from "rxjs";
import { CoursesService } from "./courses.service";
import { Injectable } from "@angular/core";

@Injectable()
export class CourseResolver implements Resolve<Course> {
  constructor(private courseService: CoursesService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Course> | Promise<Course> | Course {
    const courseUrl = route.paramMap.get("courseUrl");
    return this.courseService.loadCourseByUrl(courseUrl);
  }
}
