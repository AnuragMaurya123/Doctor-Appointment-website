
export const formData=(date,config)=>{
    const defaultOption={day:"numeric",month:"short",year:"numeric"}
    const option = config ? config : defaultOption;
    return new Date(date).toLocaleDateString('en-IN',option)
}