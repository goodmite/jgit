import { IIssue } from "../../interfaces";
export declare enum EIssueType {
    Bug = "Bug",
    Story = "Story"
}
export declare function createBranchByIssue(data: IIssue): Promise<string>;
export declare function checkoutBranch(branch: string): Promise<any>;
