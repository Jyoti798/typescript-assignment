var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Pipeline function
function createPipeline(transformations, validate) {
    return function (initialData) {
        return __awaiter(this, void 0, void 0, function* () {
            let finalData = initialData;
            try {
                for (const transform of transformations) {
                    finalData = yield transform(finalData);
                }
                if (validate(finalData)) {
                    return finalData;
                }
                else {
                    return new Error("Validation failed for final output");
                }
            }
            catch (error) {
                return new Error(`Pipeline error: ${error.message}`);
            }
        });
    };
}
//  Validator
const isProcessedUser = (data) => {
    return (typeof data === "object" &&
        data !== null &&
        "fullName" in data &&
        "contactNumber" in data &&
        "email" in data &&
        "isEmailValid" in data &&
        "address" in data);
};
// Utility to generate address
const generateAddress = (fullName) => {
    const zip = Math.floor(10000 + Math.random() * 90000);
    return `${fullName}, 123 Main Street, Sample City, ZIP-${zip}`;
};
// Transformations 
// Normalize the name
const nameNormalization = (user) => (Object.assign(Object.assign({}, user), { firstName: user.firstName.trim().toUpperCase(), lastName: user.lastName.trim().toUpperCase() }));
// Create initial processed user
const createInitialProcessedUser = (user) => ({
    fullName: `${user.firstName} ${user.lastName}`,
    contactNumber: user.contactNumber,
    email: user.email,
    isEmailValid: false,
    address: "",
});
// Validate email
const validateEmail = (user) => (Object.assign(Object.assign({}, user), { isEmailValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email) }));
// Generate address
const addAddress = (user) => (Object.assign(Object.assign({}, user), { address: generateAddress(user.fullName) }));
//Create Pipeline
const pipeline = createPipeline([nameNormalization, createInitialProcessedUser, validateEmail, addAddress], isProcessedUser);
// Raw Data
const initialUser = {
    firstName: "  jyoti ",
    lastName: "singh ",
    contactNumber: "9876543210",
    email: "jyoti.singh@example.com",
};
// Run Pipeline with .then().catch() 
pipeline(initialUser)
    .then((result) => {
    if (result instanceof Error) {
        console.error("Pipeline failed:", result.message);
    }
    else {
        console.log("Pipeline result:", result);
    }
})
    .catch((err) => {
    console.error("Error:", err.message);
});
export {};
