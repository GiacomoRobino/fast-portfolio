export interface job{
        "name": string,
        "image": string,
        "link": string,
        "description": string,
        "period": {
            "start": string,
            "end"?: string
        
        }
}