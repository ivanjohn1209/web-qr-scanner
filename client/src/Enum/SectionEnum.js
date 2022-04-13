import { GradeEnum } from "./GradeEnum";

export const SectionEnumList = [
    {v: "sampaguita", t: "Sampaguita", grade: GradeEnum.seven },
    {v: "narra", t: "Narra", grade: GradeEnum.eight },
    {v: "emerald", t: "Emerald", grade: GradeEnum.nine },
    {v: "lopez jaena", t: "Lopez Jaena", grade: GradeEnum.ten },
    {v: "hope", t: "Hope", grade: GradeEnum.eleven },
    {v: "dove", t: "Dove", grade: GradeEnum.twelve },
]

/**
 * get Section by grade 
 * @param {Number} grade 
 * @returns 
 */
export const GetSectionByGrade = (grade) => {
    var list = SectionEnumList.filter(e => e.grade === grade);
    return list;
}