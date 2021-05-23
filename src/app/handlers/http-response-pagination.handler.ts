import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { PaginationService } from '@services/pagination.service';
import { PaginationModel } from '@models/pagination.model';

@Injectable({
  providedIn: 'root'
})
export class HttpResponsePaginationHandler {
  constructor(private paginationService: PaginationService) {
  }

  handle(response: HttpResponse<any>, request: HttpRequest<any>) {
    let entityName = null;
    if (request.headers.has('NgrxEntity')) {
      entityName = request.headers.get('NgrxEntity');
    }

    const links = (response.headers.get('Link') || "").split(';') as string [];
    const refId = links.findIndex(element => element.trim().startsWith('rel="last"')) - 1;
    var url_string = ((links[refId] || "").split(',')[1] || "").replace('<','').replace('>','').trim();
    try{
      var url = new URL(url_string);
      var lastPage = url.searchParams.get("_page") || '1';
      this.paginationService.upsert({
        id: entityName,
        length: parseInt(lastPage) * 5
      } as PaginationModel).subscribe();
    } catch {}
  }
}
