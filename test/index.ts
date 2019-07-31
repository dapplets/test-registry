import { homeTest } from "./routes/home";
import { accountCreation, accountDeletion } from "./routes/api/accounts";
import { fileCreation, fileDeletion } from "./routes/api/storage";
import { registryCreationDeletion } from "./routes/api/registry";

describe("Home Page", homeTest);
describe("Account creation", accountCreation);
describe("File creation", fileCreation);
describe("Registry Creation and Deletion", registryCreationDeletion);
describe("File deletion", fileDeletion);
describe("Account deletion", accountDeletion);