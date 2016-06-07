/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package spring.taquin.algorithm;

import java.util.Comparator;
import java.util.GregorianCalendar;
import spring.taquin.solve.Utils;
import spring.taquin.solve.XSRandom;

/**
 *
 * @author berme_000
 */
public class NodeSearchComparator implements Comparator<NodeSearch>{

    @Override
    public int compare(NodeSearch o1, NodeSearch o2) {
            if (o1.getF()-o2.getF()==0){
               if(o1.getH()<o2.getH()&&o1.getG()<o2.getG()){
                   return 1;
               }else if (o1.getH()>o2.getH()&&o1.getG()>o2.getG()){
                   return -1;
               }else if (o1.getH()<o2.getH()){
                   return 1;
               }else if (o1.getH()>o2.getH()){
                   return -1;
               }
               
               else{
                   
                   XSRandom r=new XSRandom((long) (Math.random()*(new GregorianCalendar()).getTimeInMillis()));
                   return (int)(r.nextInt(2)-1.5);
                   //return (int)(Utils.randInt(1, 5)-2.5);
                   
                }
               //*/
            
            }
            //*/
            return (int) ((o1.getF()-o2.getF()));
    }
    
}
