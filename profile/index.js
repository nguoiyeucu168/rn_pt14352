import React,{useState} from 'react';
import {
    View, 
    Text,
     FlatList, 
     StyleSheet, 
     Image, 
     Switch,
     Modal, 
     Button,
     TextInput,
     Picker
    } from 'react-native';
import InfoText from './info-text';
import SubjectItem from './subject_item'

export default function Profile(){
 
    const userProfile={
        info:{
            avatar:'https://iap.poly.edu.vn/user/ph/PH09025.jpg',
            name:'K  ',
            email:'',
            address:'HN',
            phone:'4161115',
            active: true
        },
        subject:[
            {
                name:'ReactNative',
                identity:'MOB306',
                classname:'PT1124'
            },
            {
                name:'ReactNative111',
                identity:'MOB307',
                classname:'PT1123'
            },
            {
                name:'ReactNative222',
                identity:'MOB30688',
                classname:'PT1125'
            }
        ]
    };
    const [showModal,setShowModal]=useState(false);

    const [showInfo,setShowInfo]=useState(true);

    const [user, setUser]=useState(userProfile);

    const [nameS,setnameS]=useState("");
    const [identityS,setidentityS]=useState("");
    const [classS,setclassS]=useState("");

    const addi=()=>{
        let newProfilelist=user.subject;
        const subject={
            name: nameS.toString(),identity: identityS.toString(),
            classname: classS.toString()
        };
        newProfilelist=newProfilelist.push(subject);
    }

    const handleDeleteSub=(identity)=>{
        let newSubjectList=user.subject;
        newSubjectList=newSubjectList.filter((subject)=> subject.identity != identity);
        userProfile.subject=newSubjectList;
        setUser(userProfile);
    }
  
    return(
        <View>
            <View>
                <Image style={style.image} source={{uri: user.info.avatar}} />
                <Switch value={showInfo} onValueChange={()=>setShowInfo(!showInfo)}/>
            </View>
            <Text>-------------------</Text>
            <View>
                {
                    showInfo ?
                <InfoText data={user.info}/>
                : null
                }   
                <Text>------------------</Text>
                <Button title="Add Subject" onPress={()=>{
                    setShowModal(true);
                }}/>
                <FlatList
                    data={user.subject}
                    renderItem={({item})=><SubjectItem item={item} 
                                handledelete={handleDeleteSub} /> }
                    keyExtractor={(item,index)=> index}
                />
            </View>
            <Modal visible={showModal}>
                <View>
                    <Text>Modal Add Subject</Text>
                <Text>Name</Text>
                    <TextInput onChangeText={(valueN)=>setnameS(valueN)} />
                    <Text>Identity</Text>
                    <TextInput onChangeText={(valIdentity)=>setidentityS(valIdentity)} />
                    <Text>Select Class Name</Text>
                <Picker selectedValue="PT1111" onValueChange={(valCl) => setclassS(valCl)}>
                    <Picker.Item value="PT1111" label="PT1111" />
                    <Picker.Item value="PT1112" label="PT1112" />
                    <Picker.Item value="PT1113" label="PT1114" />
                </Picker>
                <Button
                    title="Cancle"  onPress={() => {setShowModal(false);}}
                />
                <Button title="Subject" onPress={()=>{additem(),setShowModal(false)}}/>
          </View>
        </Modal>
        </View>
    );
}
const style=StyleSheet.create({
    profileContainer: {},
    avatar:{},
    image:{
       width: 200,
       height: 200,
       borderRadius: 200 
    }
});
