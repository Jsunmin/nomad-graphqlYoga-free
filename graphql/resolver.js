import { people } from "./db";


// query를 resolve 하는 것 (해석?!)
const resolver = {
    Query: {
        people: () => people // arr 리턴
    }
}

export default resolver;