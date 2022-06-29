import { Pagination } from '../components/interfaces/interfaces';
import { getData } from '../functions/api';


test('API function works correctly (check requests limitation if test is failed)', async() => {
  const username:string = "V714"
  const phrase:string = "db.collection('homeDevices',"
  const language:string = "js"
  const pagination:Pagination = {page:1,perPage:1}

  const description:string = "Intelligent Home Project"

  const data = await getData(username,phrase,language,pagination)
  expect(data.items[0].repository.description).toBe(description)

});
