// @author Vamshi Gopari, Akhil Krishna Sai Takkella, Purna Chandra Pattipati, Vaishnavi Priya Chennu 
export interface Survey {
  studentId: number;
  firstName: string;
  lastName: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  telephoneNumber: string;
  email: string;
  dateOfSurvey: Date; // You might want to use a specific Date type here if needed
  likedStudents: boolean;
  likedLocation: boolean;
  likedCampus: boolean;
  likedAtmosphere: boolean;
  likedDormRooms: boolean;
  likedSports: boolean;
  interestSource: string; // Use a specific type if InterestSource is not a string
  recommendLikelihood: string; // Use a specific type if RecommendLikelihood is not a string
  additionalComments: string;
  submissionTimestamp: string; // You might want to use a specific Date type here if needed
}
