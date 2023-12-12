import { compare, hash } from "bcrypt";


export const createPassword = async(password: string): Promise<string> => {

    const saltRounds = 10;

    return hash(password, saltRounds);
};

export const validatePassword = async (password: string, passwordHash: string): Promise<boolean> => {

    return compare(password, passwordHash);

}