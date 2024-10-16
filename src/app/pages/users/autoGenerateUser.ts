import { UsersService } from "../../services/users.service";
import { randomId, randomImage, randomString } from "../../tools/randomCompiler";

export function autoGenerateUser(usersService:UsersService) {
  usersService.addUser({
    id: randomId(),
    email: randomString()+'@email',
    username: randomString(),
    password: randomString(),
    imageUrl: randomImage(),
  })
}