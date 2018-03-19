//
//  SafeAreaSpacerView.h
//  RNCommon
//
//  Created by Reza on 3/19/18.
//  Copyright © 2018 kajoo. All rights reserved.
//

#import <React/RCTView.h>

#ifndef SafeAreaSpacerView_h
#define SafeAreaSpacerView_h

@class RCTBridge;

@interface SafeAreaSpacerView : RCTView
- (instancetype)initWithBridge:(RCTBridge *)bridge;
@end

#endif /* SafeAreaSpacerView_h */
