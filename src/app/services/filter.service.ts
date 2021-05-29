import { Location } from "@angular/common";
import { Injectable } from "@angular/core";
import { FilterField } from "@/app/models/filter-field.model";
import { QueryParams } from "@ngrx/data";

@Injectable()
export class FilterService {
  private _displayedFields: string[] = [];
  get displayedFields(): string[] {
    return this._displayedFields;
  }
  pageLength!: number;
  pageSize!: number;
  private _fields: Map<string, FilterField> = new Map<string,FilterField>();
  filterValues: any = {};
  private _initialRoute!: string;

  constructor(){
  }

  initialize(initialRoute: string, initialPageSize: number, fields?: FilterField | FilterField[]) {
    this._initialRoute = initialRoute;
    this.pageSize = initialPageSize;
    if(Array.isArray(fields)){
      this.setFields(fields as FilterField[]);
    } else {
      this.setField(fields as FilterField);
    }
  }

  setField(field: FilterField) {
    if(field.isDisplayed && !this._fields.has(field.name)) {
      this._displayedFields = [
        ...this._displayedFields,
        field.name
      ]
    }
    this._fields.set(field.name, field);
    if (!!field.filterValue){
      this.filterValues[field.name] = field.filterValue;
    }
  }

  setFields(fields: FilterField[]) {
    fields.forEach(field=> {
      if(field.isDisplayed && !this._fields.has(field.name)) {
        this._displayedFields = [
          ...this._displayedFields,
          field.name
        ]
      }
      this._fields.set(field.name, field);
      if (!!field.filterValue) {
        this.filterValues[field.name] = field.filterValue;
      }
    });
  }

  addQueryParamsInRoute(currentPage: number, currentPageSize: number, currentSortField: string, currentSortDirection: string): QueryParams {
    let resultQueryParams = {
      '_page': currentPage.toString(),
      '_limit': currentPageSize.toString(),
      '_sort': currentSortField,
      '_order': currentSortDirection
    } as QueryParams;
    this._transformQueryParams(resultQueryParams);
    return resultQueryParams;
  }

  replaceQueryParamsInRoute(queryParams: QueryParams): QueryParams {
    let resultQueryParams = {
      ...queryParams
    };
    this._transformQueryParams(resultQueryParams);
    return resultQueryParams;
  }

  private _transformQueryParams(resultQueryParams: QueryParams){
    this._displayedFields.forEach(fieldName=> {
      if(this._fields.has(fieldName)) {
        if (!!this.filterValues[fieldName]) {
          resultQueryParams[fieldName + '_like'] = this.filterValues[fieldName] || '';
        }
      }
    });
    const currentParams = {...resultQueryParams};
      (currentParams['_page'] as any) = undefined;
    if (!!!resultQueryParams) {
      window.history.pushState({}, '',`${this._initialRoute};queryParams=${JSON.stringify(currentParams)}`);
    } else {
      resultQueryParams = JSON.parse(JSON.stringify({...currentParams}));
      window.history.replaceState({}, '',`${this._initialRoute};queryParams=${JSON.stringify(resultQueryParams)}`);
    }
    return resultQueryParams;
  }

  setFilterValuesFromQueryParams(queryParams: QueryParams) {
    Object.keys(queryParams).forEach((key) => {
      if(key.includes('_like')) {
        this.filterValues[key.replace(new RegExp('_like' + '$'), '')] = queryParams[key];
      }
    })
  }

  setInitialRoute(route: string){
    this._initialRoute = route;
  }

}
