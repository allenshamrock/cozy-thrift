export const getTimeAgo=(dateString:string):string=>{
    const now = new Date()
    const date = new Date(dateString)

    const seconds = Math.floor((now.getTime()-date.getTime())/1000)

    console.log(seconds)

       const intervals = [
         { label: "year", seconds: 31536000 },
         { label: "month", seconds: 2592000 },
         { label: "day", seconds: 86400 },
         { label: "hour", seconds: 3600 },
         { label: "minute", seconds: 60 },
         { label: "second", seconds: 1 },
       ];

       for (const interval of intervals){
        const count = Math.floor(seconds / interval.seconds)

        if(count>=1){
            return `${count} ${interval.label}${count > 1 ? "s": ""} ago`
        }
       }

       return "just now" //fallback 
}