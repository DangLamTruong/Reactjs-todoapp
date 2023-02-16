const SmallMedal  = (props) => {
   console.log(props);
   return <div>
        <h1>{props.avatar}</h1>
        <h1>{props.groupName}</h1>
    </div>
}

const Box = (props) => {
   const { avatar, groupName, memberList, status, description, numoftasks } = props;
    return <div className="container">
        <p>Avatar: {avatar}</p>
        <p>GroupName: {groupName}</p>
        <p>MemberList: {memberList}</p>
        <p>Status: {status}</p>
        <p>Description: {description}</p>
    
        <SmallMedal
            {...props}
            avatar={'222222'}
            
        />
    </div>
}

export default Box;

