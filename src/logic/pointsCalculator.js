import {isNumeric} from "../utils/dateUtils";

const DOUBLE_POINTS_LEVEL = 100
const SINGLE_POINT_LEVEL = 50
export const calculatePoints = (amount) =>{
    if(isNumeric(amount)){
        let points = 0;
        let processedAmount = Math.round(amount);
        if(amount > DOUBLE_POINTS_LEVEL){
            points += 2 * (processedAmount - DOUBLE_POINTS_LEVEL);
            processedAmount = DOUBLE_POINTS_LEVEL
        }
        const singlePoints = processedAmount > SINGLE_POINT_LEVEL ? processedAmount - SINGLE_POINT_LEVEL : 0
        points += singlePoints;

        return points;
    }
    console.error('Amount must be a number!', amount);
    return 0;
}