export interface Pagination {
    currentPage : number;
    itemPerPage : number;
    totalItem : number;
    totalPage : number;
}

export class PaginatedResult<T> {
    result : T;
    pagination : Pagination;
}