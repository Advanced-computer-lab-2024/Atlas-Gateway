
export default async function searchFilterSort(search : string, condition : any, sort : string , pageNumber : number) {
// TODO: Finish Implementation of this method
    return [
        {
            $search:{}
        },
        {
            $filter: {}
        },
        {
            $sort: {}
        },
        {
            $batch: {}
        }
    ];
}
