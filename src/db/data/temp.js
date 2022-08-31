const {promises: fsPromise} = require("fs")


fsPromise.readFile("/Users/zop9896/Projects/cartdrop-api/json_data/core_latest.json", {encoding: "utf-8"})
.then(data => {
    if (data){
        const jsonData = JSON.parse(data)
        const brandData = []
        let pkCounter = 1;

        jsonData.forEach(item => {
            if (item.model === "core.brand"){
                const tableName = "brands"
                const newItem = {
                    table: tableName,
                    fields: {
                        pk: pkCounter,
                        name: item.fields.name,
                        slug: item.fields.slug,
                        photo: item.fields.photo,
                        placeholder: item.fields.placeholder
                    }
                }
                brandData.push(newItem)
                pkCounter += 1
            }
        })
        fsPromise.writeFile("/Users/zop9896/Projects/cartdrop-api-node/src/db/data/productBrands.json", JSON.stringify(brandData, null, 2), {encoding: 'utf-8'})
    }
})
.catch(err => console.log(err))