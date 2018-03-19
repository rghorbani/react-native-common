//
//  SafeAreaSpacerViewLocalData.h
//  RNCommon
//
//  Created by Reza on 3/19/18.
//  Copyright © 2018 kajoo. All rights reserved.
//

#import <UIKit/UIKit.h>

#ifndef SafeAreaSpacerViewLocalData_h
#define SafeAreaSpacerViewLocalData_h

@interface SafeAreaSpacerViewLocalData : NSObject

- (instancetype)initWithInsets:(UIEdgeInsets)insets;

@property (atomic, readonly) UIEdgeInsets insets;

@end

#endif /* SafeAreaSpacerViewLocalData_h */
