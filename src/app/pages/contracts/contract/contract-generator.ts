import { style } from "@angular/animations";
import { HttpClient } from "@angular/common/http";
import {
  AlignmentType,
  BorderStyle,
  convertInchesToTwip,
  Document,
  HeadingLevel,
  ImageRun,
  LevelFormat,
  Media,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TabStopPosition,
  TabStopType,
  TextRun,
  UnderlineType,
  VerticalAlign,
  WidthType
} from "docx";

arrayBuffer:ArrayBuffer
class callHttp {
  constructor(private http: HttpClient) {}
}

export class DocumentCreator {
  
  //tslint:disable-next-line: typedef
  public create([item,name]:any): Document {
     const bName:any[]=[]
     const bFrequency:any[]=[]
     item.benefits.map((benefit: { name: Paragraph;frequency:Paragraph })=>{
       bName.push(new Paragraph(`${benefit.name}`))
       bFrequency.push(new Paragraph(`${benefit.frequency}`))
     })
     console.log(bName)
     bName.forEach(ele=>new Paragraph(`${ele}`));
     const month=this.getMonthFromInt(item.date.slice(5,7));
    const document = new Document({
      styles: {
        default: {
            heading1: {
                run: {
                    size: 24,
                    bold: true,
                    color: "00000",
                },
                paragraph: {
                    spacing: {
                        after: 320,
                    },
                    indent:{
                      left: 125
                    }
                },
            },
            heading2: {
                run: {
                    size: 26,
                    bold: true,

                },
                paragraph: {
                    spacing: {
                        before: 240,
                        after: 120,
                    },
                    
                },
            },
            listParagraph: {
                run: {
                    color: "#FF0000",
                },
            },
        },
        paragraphStyles: [
            {
                id: "aside",
                name: "Aside",
                run: {
                    font: "Calibri",
                    size: 24,
                    bold:true
                }
            },
            {
                id: "wellSpaced",
                name: "Well Spaced",
                basedOn: "Normal",
                quickFormat: true,
                paragraph: {
                    spacing: { line: 276, before: 20 * 72 * 0.1, after: 20 * 72 * 0.05 },
                },
            },
        ],
    },
    numbering: {
        config: [
            {
                reference: "my-crazy-numbering",
                levels: [
                    {
                        level: 0,
                        format: LevelFormat.LOWER_LETTER,
                        text: "%1)",
                        alignment: AlignmentType.LEFT,
                    },
                ],
            },
        ],
    },sections: [
        {
          children: [
            this.createTitle(`Employment Contract No.${item.workerId}`),
            this.createIntro(`This contract, dated on the ${item.date.slice(8,10)} day of ${month} in the year ${item.date.slice(0,4)}, is made between ${item.companyName} and ${name} of ${item.city}, ${item.state}. This document constitutes an employment agreement between these two parties and is governed by the laws of ${item.state}`,"WHEREAS the Employer desires to retain the services of the Employee, and the Employee desires to render such services, these terms and conditions are set forth.","IN CONSIDERATION of this mutual understanding, the parties agree to the following terms and conditions:") , 

            this.createHeading("1. Employment"),
            new Paragraph({
              children:[
                new TextRun({
                  text: "The Employee agrees that he or she will faithfully and to the best of their ability carry out the duties and responsibilities communicated to them by the Employer. The Employee shall comply with all company policies, rules and procedures at all times.",

                  font: "Calibri",
                  size: 24
              })
               ]
            }
              
            ),

           
            this.createHeading("2. Position"),
            this.createParagraph( `As a ${item.role}, it is the duty of the Employee to perform all essential job functions and duties. From time to time, the Employer may also add other duties within the reasonable scope of the Employee’s work.`),

            this.createHeading("3. Compensation"),
            this.createParagraph(`As compensation for the services provided, the Employee shall be paid a wage of $${item.salary} ${item.paymentPeriod} and will be subject to a(n) ${item.performanceReviewPeriod} performance review. All payments shall be subject to mandatory employment deductions (State & Federal Taxes, Social Security, Medicare).`),

            this.createHeading("4. Benefits"),
            
            
              new Table({
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({text:"Benefits",alignment:AlignmentType.CENTER,style:"aside"})],
                                
                            }),
                        
                            new TableCell({
                                children: [new Paragraph({text:"Frequency",alignment:AlignmentType.CENTER,style:"aside"})],
                            }),
                        ],
                    }),
                    // ...item.benefits.map((benefit: { name: any; frequency: any; })=>{
   
                    // })
                    new TableRow({
                      children: [
                          new TableCell({
                              children: bName,
                          }),
                          new TableCell({
                              children:bFrequency,
                          }),
                      ],
                  })
           
                ],
                width: {
                  size: 60,
                  type: WidthType.PERCENTAGE
              },
              borders:{
                top: {
                  style:BorderStyle.SINGLE,size:1,color:"000"
                },
                bottom: {
                  style:BorderStyle.SINGLE,size:1,color:"000"
                },
                left: {
                  style:BorderStyle.SINGLE,size:1,color:"000"
                },
                right: {
                  style:BorderStyle.SINGLE,size:1,color:"000"
                },
                
              }
              ,
              alignment:AlignmentType.CENTER
            },
              
              
              
              ),
          
  
          ]
        }
      ]
    });

    return document;
  }

  public createContactInfo(
    phoneNumber: string,
    profileUrl: string,
    email: string
  ): Paragraph {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun(
          `Mobile: ${phoneNumber} | LinkedIn: ${profileUrl} | Email: ${email}`
        ),
        new TextRun({
          text: "Address: 58 Elm Avenue, Kent ME4 6ER, UK",
          break: 1
        })
      ]
    });
  }

  public createHeading(text: string): Paragraph {
    return new Paragraph({
      text: text,
      heading: HeadingLevel.HEADING_1
    });
  }
  public createTitle(text: string): Paragraph {
    return new Paragraph({
      text: text,
      heading: HeadingLevel.HEADING_2
    });
  }
  public createInstitutionHeader(
    institutionName: string,
    dateText: string
  ): Paragraph {
    return new Paragraph({
      tabStops: [
        {
          type: TabStopType.RIGHT,
          position: TabStopPosition.MAX
        }
      ],
      children: [
        new TextRun({
          text: institutionName,
          bold: true
        }),
        new TextRun({
          text: `\t${dateText}`,
          bold: true
        })
      ]
    });
  }

  public createIntro(
    text1: string,
    text2: string,
    text3: string,
  ): Paragraph {
    return new Paragraph({
      tabStops: [
        {
          type: TabStopType.RIGHT,
          position: TabStopPosition.MAX
        }
      ],
      children: [
        new TextRun({
          text: text1,
          break:2,
          size: 24,
          font: "Calibri"
        }),
        new TextRun({
          text: text2,
          break:2,
          size: 24,
          font: "Calibri"
        }),
        new TextRun({
          text: text3,
          break:2,
          size: 24,
          font: "Calibri"
        }
        )
      ],alignment:AlignmentType.JUSTIFIED
    });
  }

  public createParagraph(text: string): Paragraph {
    return new Paragraph({
      children: [
        new TextRun({
          text: text,
           size :24 ,
           font: "Calibri"
        })
      ],
      alignment: AlignmentType.JUSTIFIED
    });
  }


  public getMonthFromInt(value: string): string {
    switch (value) {
      case "1":
        return "January";
      case "2":
        return "February";
      case "3":
        return "March";
      case "4":
        return "April";
      case "5":
        return "May";
      case "6":
        return "June";
      case "7":
        return "July";
      case "8":
        return "August";
      case "9":
        return "September";
      case "10":
        return "October";
      case "11":
        return "November";
      case "12":
        return "December";
      default:
        return "N/A";
    }
  }
}
function base64(base64: any): string | Buffer | Uint8Array | ArrayBuffer {
  throw new Error("Function not implemented.");
}

