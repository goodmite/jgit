export declare enum EIssueType {
    Bug = "Bug",
    Story = "Story"
}
export declare function createBranch(data: {
    issuetype_name: EIssueType;
    key: string;
    fields_summary: string;
}): Promise<any>;
