import { Category, Status } from "../dto/create-annotation.dto"

export class Annotation {
  id?: String
  title: String
  content?: String
  important: Boolean
  category: Category
  status?: Status
  createdAt?: Date
  updatedAt?: Date
}
