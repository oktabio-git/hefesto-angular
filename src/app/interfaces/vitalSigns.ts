export interface VitalSigns {
  id: number;
  patientId: number;
  doctorId: number;
  appointmentId: number;
  temperature: number;
  systolic: number;
  diastolic: number;
  heartRate: number;
  date: string;
  result: string;
}
