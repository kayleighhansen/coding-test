export class Part {
    public part : string;
    public partOrigin : string;
    public partDestination : string;
    public partWeightKilos : string;
    public EstimatedArrivedDateTime : string;
    public DeliveredDateTime : string

    constructor(part: string, 
                partOrigin: string, 
                partDestination: string,
                partWeightKilos: string, 
                EstimatedArrivedDateTime: string,
                DeliveredDateTime: string){

        this.part = part;
        this.partOrigin = partOrigin;
        this.partDestination = partDestination;
        this.partWeightKilos = partWeightKilos;
        this.EstimatedArrivedDateTime = EstimatedArrivedDateTime;
        this.DeliveredDateTime = DeliveredDateTime;

    };
}