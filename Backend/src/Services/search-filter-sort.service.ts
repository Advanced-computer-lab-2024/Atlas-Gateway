
export default async function searchFilterSort(search : string, condition : any, sort : string , pageNumber : number) {

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
