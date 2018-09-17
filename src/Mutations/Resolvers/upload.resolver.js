
const result = {
    singleUpload: async function (parent, { image }) {
        const { filename, mimetype, createReadStream } = await image
        const stream = createReadStream()

        return true
      }
}