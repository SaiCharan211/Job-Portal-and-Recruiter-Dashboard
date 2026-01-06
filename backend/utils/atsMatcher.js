export const calculateATSScore = (resumeText,job)=>{
    const resume=resumeText.toLowerCase();

    const jobKeywords=[
        ...job.skills,
        ...job.description.split(" ")
    ].map(word=>word.toLowerCase())

    const uniqueKeywords=[...new Set(jobKeywords)];

    let matched=[]

    uniqueKeywords.forEach(keyword=>{
        if(resume.includes(keyword)){
            matched.push(keyword)
        }
    })

    const score=(matched.length / uniqueKeywords.length)*100

    return {
        score:Number(score.toFixed(2)),
        matchedSkills:matched
    }

}