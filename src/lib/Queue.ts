import  Queue  from "bull";
import redisConfig from "@/config/redis";

const mailQueue = new Queue('mail', redisConfig);

export default mailQueue



