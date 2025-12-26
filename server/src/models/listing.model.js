    import mongoose from "mongoose";




    
    // const ListingSchema = new Schema({
    //   name: {
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true
    //   },
    //   materialType: {
    //     type: String,
    //     required: true
    //   },
    //   grade: {
    //     type: String,
    //     required: true
    //   },
    //   status: {
    //     type: String,
    //     enum: ['Active', 'Passive',],
    //     default: 'Active'
    //   },
    //   priceAmount: {
    //     type: Number,
    //     required: true
    //   },
    //   priceUnit: {
    //     type: String,
    //     enum: ['Kg', 'MT', 'Lb'],
    //     default: 'Kg',
    //   },

    //   minOrderQuantity: {
    //     type: Number,
    //     required: true
    //   },
    //   minOrderUnit: {
    //     type: String,
    //     enum: ['Kg', 'MT', 'Lb'],
    //     default: 'MT'
    //   },

    //   createdAt: {
    //     type: Date,
    //     default: Date.now
    //   }
    // });

    const ListingSchema = new mongoose.Schema({
        polymerGrade: {
            type: String,
            required: [true, 'Polymer Grade is required.'],
            trim: true
        },
        polymerType: { 
            type: String,
            required: [true, 'Polymer Type is required.'],
            trim: true
        },
        
        pricePerKg: {
            type: Number,
            required: [true, 'Price per KG is required.'],
            min: 0
        },
        minOrder: { // MT (Metric Tons)
            type: Number,
            required: [true, 'Minimum Order quantity is required.'],
            min: 1
        },

        dataSheetUrl: {
            type: String,
            required: [true, 'Data Sheet URL is required.'],
            trim: true,
            match: [/^https?:\/\/.*/, 'Must be a valid URL'] // Basic URL validation
        },
        mfi: { 
            type: Number,
            required: [true, 'MFI value is required.']
        },
        isAcknowledged: {
            type: Boolean,
            required: [true, 'Acknowledgement of terms is required.'],
            default: false
        },
        status: {
            type: String,
            enum: ['active', 'Passive'],
            required: true,
            default: 'active' 
        },
        // commission: { // Set by admin, calculated from pricePerKg
        //     type: Number,
        //     default: 0,
        //     min: 0
        // },
        submittedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', 
        },
    }, {
        timestamps: true 
    });


    export default mongoose.model('Listing', ListingSchema);