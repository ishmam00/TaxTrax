const TaxSchema= require("../models/TaxModel")


exports.addTax = async (req, res) => {
    const {title, amount, category, description}  = req.body

    const tax = TaxSchema({
        title,
        amount,
        category,
        description
    })

    try {
        //validations
        if(!title || !category || !description){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await tax.save()
        res.status(200).json({message: 'Tax Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
        console.log(error)
    }

    console.log(tax)
}

exports.getTaxes = async (req, res) =>{
    try {
        const taxes = await TaxSchema.find().sort({createdAt: -1})
        res.status(200).json(taxes)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
        console.log(error)
    }
}

exports.deleteTax = async (req, res) =>{
    const {id} = req.params;
    TaxSchema.findByIdAndDelete(id)
        .then((tax) =>{
            res.status(200).json({message: 'Tax Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
            console.log(err)
        })
}