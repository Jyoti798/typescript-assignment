// Initial user format
type InitialUser = {
    firstName: string;
    lastName: string;
    contactNumber: string;
    email: string;
  };
  
  // Processed user format
  type ProcessedUser = {
    fullName: string;
    contactNumber: string;
    email: string;
    isEmailValid: boolean;
    address: string;
  };
  
  // Type for Transformation
  type Transformation<Input, Output> = (input: Input) => Output | Promise<Output>;
  
  // Pipeline function
  function createPipeline<InputType, OutputType>(
    transformations: Transformation<any, any>[],
    validate: (data: unknown) => data is OutputType
  ): (initialData: InputType) => Promise<OutputType | Error> {
    return async function (initialData: InputType): Promise<OutputType | Error> {
      let finalData = initialData;
  
      try {
        for (const transform of transformations) {
          finalData = await transform(finalData);
        }
  
        if (validate(finalData)) {
          return finalData;
        } else {
          return new Error("Validation failed for final output");
        }
      } catch (error: any) {
        return new Error(`Pipeline error: ${error.message}`);
      }
    };
  }
  
  //  Validator
  const isProcessedUser = (data: unknown): data is ProcessedUser => {
    return (
      typeof data === "object" &&
      data !== null &&
      "fullName" in data &&
      "contactNumber" in data &&
      "email" in data &&
      "isEmailValid" in data &&
      "address" in data
    );
  };
  
  // Utility to generate address
  const generateAddress = (fullName: string): string => {
    const zip = Math.floor(10000 + Math.random() * 90000);
    return `${fullName}, 123 Main Street, Sample City, ZIP-${zip}`;
  };
  
  // Transformations 
  
  // Normalize the name
  const nameNormalization: Transformation<InitialUser, InitialUser> = (user) => ({
    ...user,
    firstName: user.firstName.trim().toUpperCase(),
    lastName: user.lastName.trim().toUpperCase(),
  });
  
  // Create initial processed user
  const createInitialProcessedUser: Transformation<InitialUser, ProcessedUser> = (user) => ({
    fullName: `${user.firstName} ${user.lastName}`,
    contactNumber: user.contactNumber,
    email: user.email,
    isEmailValid: false,
    address: "",
  });
  
  // Validate email
  const validateEmail: Transformation<ProcessedUser, ProcessedUser> = (user) => ({
    ...user,
    isEmailValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email),
  });
  
  // Generate address
  const addAddress: Transformation<ProcessedUser, ProcessedUser> = (user) => ({
    ...user,
    address: generateAddress(user.fullName),
  });
  
  //Create Pipeline
  const pipeline = createPipeline<InitialUser, ProcessedUser>(
    [nameNormalization, createInitialProcessedUser, validateEmail, addAddress],
    isProcessedUser
  );
  
  // Raw Data
  const initialUser: InitialUser = {
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
      } else {
        console.log("Pipeline result:", result);
      }
    })
    .catch((err) => {
      console.error("Error:", err.message);
    });
  
  export {};
  