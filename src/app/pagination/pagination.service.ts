export class PaginationService{
    currentPageNo:number=1;

    getCurrnetPageNo(){
        return this.currentPageNo;
    }

    setCurrnetPageNo(pageNo){
        this.currentPageNo=pageNo;
    }
}