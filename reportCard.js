class Student{
    constructor(name,scores){
        this.name =name;
        this.scores =scores;
    }

    get_mean(){
        if(this.scores.length == 0){return 0;}
        
        let sum =0;
        for(let i=0;i < this.scores.length;i++){
            sum+= this.scores[i];

        }
        return sum/ this.scores.length;
    }
    get_grade(){
        const avg = this.get_mean();
        if(avg >= 95){return 'A*';}
        if(avg >= 90){return 'A';}
        if(avg >= 75){return 'B';}
        if(avg >= 50){return 'C';}
        if(avg >= 40){return 'D';}
        else{return 'F'}
    }
    summary(){
        if(this.scores.length ==0){return { highest: 0, lowest: 0 };}
        let highest =this.scores[0];
        let lowest =this.scores[0];
        for(let i=1;i < this.scores.length;i++){
            if (this.scores[i] >highest) {highest =this.scores[i];}
            if (this.scores[i] < lowest) {lowest =this.scores[i];}
        }
        return {highest,lowest};
    }
    remark(grade){
        switch (grade) {
            case 'A*': return "Outstanding";
            case 'A': return "Excellent";
            case 'B': return "Good";
            case 'C': return "Average";
            case 'D': return "Passed";
            case 'F': return "Failed";
            default: return "No remarks";
        }
    }
    printReportCard() {
        const average = this.get_mean().toFixed(1);
        const grade =this.get_grade();
        const {highest,lowest} =this.summary();
        
        const status =average >=40? "PASS":"FAIL";
        const remark =this.remark(grade);

        
        const [score1=0, score2=0, ...remaining] =this.scores;

        
        console.log(`
==================================================
               STUDENT REPORT CARD                
==================================================
Student Name : ${this.name}
Status       : ${status}
--------------------------------------------------
SCORE BREAKDOWN:
- Exam 1     : ${score1}
- Exam 2     : ${score2}
- Other Exams: ${remaining.length > 0?remaining.join(', '):'None'}
--------------------------------------------------
PERFORMANCE METRICS:
- Average    : ${average}
- Grade      : ${grade}
- Highest    : ${highest}
- Lowest     : ${lowest}
--------------------------------------------------
REMARK: 
${remark}
==================================================
        `);
    }
}

function main() {
    const args = process.argv.slice(2);
    const studentName = args[0];
    const rawScores = args.slice(1);
    const scores = rawScores.map(score => Number(score));

    // 4. Input Validation (P2b): Check if less than 3 scores are provided
    if (!studentName || scores.length < 3) {
        console.error("Error:Please provide a student name followed by at least 3 exam scores.");
        console.error("Example: node reportCard.js \"John Doe\" 85 90 78");
        process.exit(1); // error code 1
    }

    //check for invalid entries in scores
    if (scores.some(isNaN)) {
        console.error("Error: All exam scores must be valid numbers.");
        process.exit(1);
    }

    //print the report card
    const student = new Student(studentName, scores);
    student.printReportCard();
}

//execute main
main();