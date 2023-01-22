import { Category, Status } from "../dto/create-annotation.dto"
import { User } from "src/module/user/entities/user.entity"

export class Annotation {
  id?: string
  title: string
  content?: string
  important: boolean
  category: Category
  status?: Status
  userId: User
  createdAt?: Date
  updatedAt?: Date
}
