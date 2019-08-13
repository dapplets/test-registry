import { homeTest } from "./controllers/home";
import { accountCreation, accountDeletion } from "./controllers/accounts";
import { fileCreation, fileDeletion } from "./controllers/storage";
import { registryCreationDeletion } from "./controllers/registry";

describe("Home Page", homeTest);
describe("Account creation", accountCreation);
describe("File creation", fileCreation);
describe("Registry Creation and Deletion", registryCreationDeletion);
describe("File deletion", fileDeletion);
describe("Account deletion", accountDeletion);