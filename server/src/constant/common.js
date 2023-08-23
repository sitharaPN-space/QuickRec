const ApplicationStatus = {
  PENDING: "PENDING",
  SELECTED: "SELECTED",
  REJECTED: "REJECTED",
};

const ActiveStatus = {
  ACT: "Open",
  INA: "Close",
  Open: "ACT",
  Close: "INA",
};

const RecruitementType = {
  Internal: "INT",
  External: "EXT",
  Internal_External: "INT_EXT",
  Promotion: "PRO",
  INT: "Internal Recruitment",
  EXT: "External Recruitment",
  INT_EXT: "Internal and External Recruitment",
  PRO: "Promotion Recruitment",
};

export { ApplicationStatus, ActiveStatus, RecruitementType };
