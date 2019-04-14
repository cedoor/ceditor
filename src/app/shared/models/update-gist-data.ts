export class UpdateGistData {
  description: string
  files: Files
}

class Files {
  [key: string]: File | null
}

class File {
  content: string
  filename: string
}
