import firebase from '../config/firebase'

const db = firebase.firestore()

export const loadProductsFromSupplier = async (supplier, category = null) => {
    const tmp = [];
    let query = await db.collection('Products').where('supplier', '==', supplier)
    if (category) {
        query = query.where('category', '==', category)
    }
    query = query.get()
        .then(querySnapshots => {
            querySnapshots.forEach(doc => {
                tmp.push({ id: doc.id, ...doc.data() })
            })
            return tmp
        })

    return query
}

export const loadSupplierByName = async (name) => {
    const tmp = [];
    return await db.collection('Supplier').get()
        .then(querySnapshots => {
            querySnapshots.forEach(doc => {
                const data = doc.data()
                if (data.name === name) {
                    tmp.push({ id: doc.id, ...doc.data() })
                } else {
                    console.log(data.name)
                }
            })
            return tmp
        })
}

export const loadProductsFromCategory = async (category) => {
    const tmp = [];
    let query = await db.collection('Products').where('category', '==', category)
    query = query.get()
        .then(querySnapshots => {
            querySnapshots.forEach(doc => {
                tmp.push({ id: doc.id, ...doc.data() })
            })
            return tmp
        })
    return query
}


export const loadAllProducts = async (category_only = false) => {
    const tmp = [];
    return await db.collection('Products').get()
        .then(querySnapshots => {
            querySnapshots.forEach(doc => {
                tmp.push({ id: doc.id, ...doc.data() })
            })

            return tmp
        }).then((result) => {
            if (category_only) {
                let categories = []
                result?.filter(i => {
                    if (!categories.includes(i.category)) {
                        categories.push(i.category)
                    }
                })
                return categories
            }
            return result
        })
}