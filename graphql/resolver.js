import { people, getById } from "./db";


// query를 resolve 하는 것 (해석?!)
const resolver = {
    Query: {
        people: () => people, // arr 리턴
        person: (_, { id }) => {
            // client에서 주는 params는 2번째 args부터..
            return getById( id );
        },
    }
}

export default resolver;